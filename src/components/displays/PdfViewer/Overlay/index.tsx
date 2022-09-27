import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './PdfViewerOverlay.css';

import { AppState, AppDispatch } from 'src/Root';
import { Button, Input, InputNumber } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

type Props = {
  visible: boolean;
  currentPage: number;
  pageCount: number;
  onPrevious: (args: any) => void;
  onNext: (args: any) => void;
  onChange: (args: any) => void;
};

function PdfViewerOverlay(props: Props) {
  const {
    visible, currentPage, pageCount, onPrevious, onNext, onChange,
  } = props;

  return (
    <div className="PdfViewerOverlayAnchor">
      <div className="PdfViewerOverlay" style={{ height: visible ? 60 : 0 }}>
        <div className="PdfViewerOverlayInterface" style={{ display: visible ? 'flex' : 'none' }}>
          <Button
            className="PdfViewerOverlayButton"
            onClick={onPrevious}
          >
            <CaretLeftOutlined />
          </Button>
          <div className="PdfViewerOverlayPageCount">
            <InputNumber
              className="PdfViewerOverlayInput"
              value={currentPage}
              controls={false}
              addonAfter={pageCount}
              onChange={onChange}
            />
          </div>
          <Button
            className="PdfViewerOverlayButton"
            onClick={onNext}
          >
            <CaretRightOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PdfViewerOverlay;
