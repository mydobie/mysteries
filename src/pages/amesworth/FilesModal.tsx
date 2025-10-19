import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import caseFiles from './caseFiles/CaseFiles.pdf';
import markham from './caseFiles/Markham.pdf';
import jensen from './caseFiles/Jensen.pdf';
import ortiz from './caseFiles/Ortiz.pdf';
import hanlon from './caseFiles/Hanlon.pdf';
import stargazer from './caseFiles/StarGazer424.pdf';

import packet2 from './caseFiles/packet2.pdf';
import packet3 from './caseFiles/packet3.pdf';
import packet4 from './caseFiles/packet4.pdf';

// import packet2 from './caseFiles/packet2.pdf';
// import packet3 from './caseFiles/packet3.pdf';

const FilesModal = () => {
  const [isOpen, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);
  const location = useLocation();
  const pathname = location.pathname;

  const showPacket2 = ['/amesworth/2', '/amesworth/3', '/amesworth/4'].includes(
    pathname,
  );
  const showPacket3 = ['/amesworth/3', '/amesworth/4'].includes(pathname);
  const showPacket4 = ['/amesworth/4'].includes(pathname);

  return (
    <>
      <Button className='openFilesModalButton' onClick={handleShow}>
        Download case files
      </Button>

      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>Case files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Download or view the case files. Go through each document, clues
            could be hidden anywhere.
          </p>
          <ul>
            <li>
              <a href={caseFiles}>Case files</a>
            </li>

            <li>
              <a href={markham}>Helen Markham</a>
            </li>
            <li>
              <a href={jensen}>Kyle Jensen</a>
            </li>
            <li>
              <a href={ortiz}>Maya Ortiz</a>
            </li>
            <li>
              <a href={hanlon}>Rick Hanlon</a>
            </li>
            <li>
              <a href={stargazer}>StarGazer424</a>
            </li>
            {showPacket2 ? (
              <li>
                <a href={packet2}>Packet 2</a>
              </li>
            ) : null}
            {showPacket3 ? (
              <li>
                <a href={packet3}>Packet 3</a>
              </li>
            ) : null}
            {showPacket4 ? (
              <li>
                <a href={packet4}>Packet 4</a>
              </li>
            ) : null}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilesModal;
