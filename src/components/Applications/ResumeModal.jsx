import React from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


const ResumeModal = ({ imageUrl, onClose }) => {
  const isPDF = imageUrl.toLowerCase().endsWith('.pdf');

  return (
    <>
      <div className='resume-modal'>
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="resume-container">
            {isPDF ? (
              <Document file={imageUrl}>
                <Page pageNumber={1} className="pdf-page"/>
              </Document>
            ) : (
              <img src={imageUrl} alt="resume" className="image-resume" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeModal;
