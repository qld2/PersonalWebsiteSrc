import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './PdfViewer.css';

import { AppState, AppDispatch } from 'src/Root';

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
  pageNumber: number,
};

class PdfViewer extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      pageNumber: 1,
    };
  }

  render(): React.ReactNode {
    const { file, width } = this.props;

    return (

      <div className="PdfViewerContainer">
        <div className="PdfViewer">
          <div className="PdfViewerOverlayAnchor">
            <div className="PdfViewerOverlay" />
          </div>
          <Document file={file}>
            <Page pageNumber={1} width={width} />
          </Document>
        </div>
      </div>

    );
  }
}

export default connector(PdfViewer);
