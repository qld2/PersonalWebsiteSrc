import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './PdfViewer.css';

import { AppState, AppDispatch } from 'src/Root';
import { Button, Input, InputNumber } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import PdfViewerOverlay from './Overlay';

const mapStateToProps = (state: AppState) => ({});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  file: string,
  width: number,
};

type State = {
  currentPage: number,
  pageCount: number,
  hovering: boolean
};

class PdfViewer extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      currentPage: 1,
      pageCount: -1,
      hovering: false,
    };
  }

  componentDidMount() {
    window.document.getElementById('pdf')?.addEventListener('mouseenter', this.onMouseEnter);
    window.document.getElementById('pdf')?.addEventListener('mouseleave', this.onMouseLeave);
  }

  componentWillUnmount() {
    window.document.getElementById('pdf')?.addEventListener('mouseenter', this.onMouseEnter);
    window.document.getElementById('pdf')?.addEventListener('mouseleave', this.onMouseLeave);
  }

  onDocumentLoad = ({ numPages }:any) => {
    this.setState({ pageCount: numPages });
  };

  onMouseEnter = () => {
    this.setState({
      hovering: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      hovering: false,
    });
  };

  flipForward = () => {
    const { currentPage, pageCount } = this.state;

    if (currentPage < pageCount) {
      this.setState({
        currentPage: currentPage + 1,
      });
    }
  };

  flipBack = () => {
    const { currentPage, pageCount } = this.state;

    if (currentPage > 1) {
      this.setState({
        currentPage: currentPage - 1,
      });
    }
  };

  choosePage = (page: number) => {
    this.setState({
      currentPage: page,
    });
  };

  render(): React.ReactNode {
    const { file, width } = this.props;
    const { hovering, currentPage, pageCount } = this.state;

    return (

      <div className="PdfViewerContainer" id="pdf">
        <div className="PdfViewer">
          <PdfViewerOverlay
            visible={hovering}
            currentPage={currentPage}
            pageCount={pageCount}
            onNext={this.flipForward}
            onPrevious={this.flipBack}
            onChange={this.choosePage}
          />
          <Document file={file} onLoadSuccess={this.onDocumentLoad}>
            <Page pageNumber={currentPage} width={width} />
          </Document>
        </div>
      </div>

    );
  }
}

export default connector(PdfViewer);
