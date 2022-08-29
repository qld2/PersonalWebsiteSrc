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
  height: number,
};

type State = {
  pageNumber: number,
};

class PdfViewer extends React.Component<Props, State> {
  public static defaultProps = {
    height: 800,
  };

  constructor(props : Props) {
    super(props);

    this.state = {
      pageNumber: 1,
    };
  }

  render(): React.ReactNode {
    const { file, height } = this.props;

    return (

      <div className="PdfViewer">
        <Document file={file}>
          <Page pageNumber={1} height={height} />
        </Document>
        <div className="PdfViewerOverlay" style={{ top: -1 * height }} />
      </div>
    );
  }
}

export default connector(PdfViewer);
