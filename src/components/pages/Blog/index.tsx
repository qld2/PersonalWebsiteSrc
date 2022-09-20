import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './Blog.css';

import { Menu } from 'antd';

import { AppState, AppDispatch } from 'src/Root';

import PdfViewer from 'components/displays/PdfViewer';
import { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from 'components/MenuBar';
import documents from './documents';

const mapStateToProps = (state: AppState) => ({
  width: state.applet.width,
  height: state.applet.height,
  menuWidth: state.menuBar.collapsed
    ? SIDEMENU_COLLAPSED_SIZE : SIDEMENU_EXPANDED_SIZE,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
};

type State = {
  currentDocument: string,
};

class Blog extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      currentDocument: '0',
    };
  }

  getMenuItems = ():JSX.Element[] => {
    const result: JSX.Element[] = [];

    documents.forEach((elem) => {
      result.push(
        <Menu.Item key={elem.key}>
          {elem.title}
        </Menu.Item>,
      );
    });

    return result;
  };

  onClick = (e: any) => {
    this.setState({
      currentDocument: e.key,
    });
  };

  render(): React.ReactNode {
    const { width, height, menuWidth } = this.props;
    const { currentDocument } = this.state;

    const appletWidth = width - menuWidth;
    const margin = 50;

    const doc = documents.find((elem) => elem.key === currentDocument);
    console.log(doc);

    return (
      <div
        className="Blog"
        style={{ width: appletWidth, height }}
      >
        <div
          className="BlogCard"
          style={{ width: appletWidth - 2 * margin, height: height - 2 * margin }}
        >
          <div className="BlogViewerSide">
            <div className="BlogViewer">
              {doc
                ? <PdfViewer file={doc?.src} width={616} />
                : (
                  <div style={{ width: 616, color: 'red' }}>
                    DOCUMENT NOT FOUND
                  </div>
                )}
            </div>
          </div>
          <div className="BlogMenuSide">
            <div
              className="BlogMenu"
              style={{ marginLeft: margin }}
            >
              <div className="BlogMenuHeader">
                Documents
              </div>
              <div className="BlogMenuDivider" />
              <Menu
                className="BlogProjectMenu"
                style={{ backgroundColor: 'transparent' }}
                mode="inline"
                theme="dark"
                selectedKeys={[currentDocument]}
                onClick={this.onClick}
              >
                {this.getMenuItems()}
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(Blog);
