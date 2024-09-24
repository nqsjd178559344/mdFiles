import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function getElementTop(element: HTMLElement) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent as HTMLElement | null;

  while (current) {
    actualTop += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return actualTop;
}

function generateElement(element: HTMLElement, contentWidth?: number) {
  const div = document.createElement("div");
  div.style.width = `${contentWidth}px`;

  for (const node of element.children) {
    const cloneNode = node.cloneNode(true) as HTMLElement | undefined;
    const imgList = cloneNode?.querySelectorAll("img").values() ?? [];
    for (const img of imgList) {
      const _img = img as HTMLElement | undefined;
      if (_img) _img.style.width = "100%";
    }
    if (cloneNode) div.appendChild(cloneNode);
  }

  return div;
}

function generatePages(
  div: HTMLDivElement,
  pdfWidth: number,
  pdfHeight: number,
  contentWidth: number
) {
  const baseX = 7;

  const originalPageWidth = pdfWidth - 2 * baseX;

  const rate = originalPageWidth / contentWidth;

  const defaultMargin = getElementTop(div);

  const pages: number[] = [defaultMargin * rate];

  for (const node of div.children) {
    const _current = node as HTMLElement;

    const { offsetHeight } = _current;

    const currentOffsetTop = getElementTop(_current);

    const lastPageHeight = pages.length ? pages[pages.length - 1] ?? 0 : 0;

    if (
      currentOffsetTop * rate + offsetHeight * rate - lastPageHeight >
      pdfHeight
    ) {
      pages.push(currentOffsetTop * rate);
    }
  }

  const newPages = pages.map((item) => item - defaultMargin * rate);

  return newPages;
}

async function generateCanvasData(div: HTMLDivElement) {
  const canvas = await html2canvas(div, {
    /**
     * 
     通过设置 html2canvas 的 scale 参数， 对canvas进行等比放大，可以使canvas生成的图片更清晰，但是放大越大生成的文件也就越大，默认像素比*2，基本满足需求。

      大致原理： 使用扩大 Canvas 画布宽高并缩放绘制内容的方式来提高图像清晰度。

      具体来说，如果将 Canvas 画布宽高扩大两倍，再将绘制的图像通过 scale() 方法在水平和垂直方向同时缩小一半（context.scale(0.5, 0.5)），最终呈现的图像占用的像素相比原来没有变化，但是细节更加清晰，像素点更加紧密。

      这种方式能够提高清晰度的原因是，当将 Canvas 宽高扩大时，每个像素点的密度也会相应增加，细节更加清晰。而 scale() 方法的缩小是在突出像素的细节的同时，对整个图像进行压缩，使得图像占用的像素数不变，从而在原有像素上为图像提高了清晰度。不过需要注意，如果扩大倍数过高，图像可能会出现失真等问题，这时需要调整扩大倍数和缩放比例来达到最佳效果。
     */
    scale: window.devicePixelRatio * 3, // 增加清晰度
  });

  const canvasData = canvas.toDataURL("image/jpeg", 1.0);

  if (canvasData === emptyCanvasData) {
    /**
     * todo 可以分多个 canvas ，用完 canvas 就销毁，最后合并。
     * 各类浏览器对于canvas的高度存在限制，当转化为 canvas 的 HTML 元素过高/宽，canvas 超出浏览器限制后，无法转化图片，生成的 PDF 就是一个空白/纯黑的文档。 可以通过分割 HTML 元素来规避这个问题，但是操作会更加繁复。
     */
    return Promise.reject(new Error("生成失败"));
  }

  const { width, height } = canvas;

  return {
    canvasData,
    width,
    height,
  };
}

const emptyCanvasData = "data:,";
export async function downloadPdf({
  element,
  filename,
  contentWidth = 600,
}: {
  element: HTMLElement;
  contentWidth?: number;
  filename: string;
}) {
  const pdf = new jsPDF();

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const baseX = 7;

  const originalPageWidth = pdfWidth - 2 * baseX;

  const div = generateElement(element, contentWidth);

  element.parentElement?.appendChild(div);

  const pages = generatePages(div, pdfWidth, pdfHeight, contentWidth);

  const {
    width: canvasWidth,
    height: canvasHeight,
    canvasData,
  } = await generateCanvasData(div);

  element.parentElement?.removeChild(div);

  const contentHeight = (canvasHeight * originalPageWidth) / canvasWidth;

  for (const [index, currentPage] of pages.entries()) {
    const y = -1 * currentPage;

    pdf.addImage(
      canvasData,
      "JPEG",
      baseX,
      y,
      originalPageWidth,
      contentHeight
    );

    if (index < pages.length - 1) {
      const imageHeight = (pages[index + 1] ?? 0) - currentPage;

      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, imageHeight, pdfWidth, pdfHeight - imageHeight, "F");

      pdf.addPage();
    }
  }

  pdf.save(filename);
}
