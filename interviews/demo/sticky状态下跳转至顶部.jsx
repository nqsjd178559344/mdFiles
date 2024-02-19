"use strict";

const tabs = ["1", "2", "3", "4"];

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = { tab: "" };
  }

  render() {
    return (
      <React.Fragment>
        <div className="top"></div>
        <div ref={this.ref}>
          <div className="title">我是标题</div>
          <div className="tabs">
            {tabs.map((tab) => (
              <span
                className="tab"
                key={tab}
                onClick={() => {
                  const titleNode = this.ref.current.children[0];
                  const tabNode = this.ref.current.children[1];
                  if (!titleNode || !tabNode) return;

                  // tabNode脱离文档流 故不可使用 其.offsetTop
                  const top = titleNode.clientHeight + titleNode.offsetTop;
                  window.scrollTo({ top });
                }}
              >
                {tab}
              </span>
            ))}
          </div>
          <div className="tabDetails">tabDetails</div>
        </div>
      </React.Fragment>
    );
  }
}

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(LikeButton));
