import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import caseFiles from './caseFiles/CaseFiles.pdf';
import msdsFiles from './caseFiles/MSDSFiles.pdf';
import marcusAdler from './caseFiles/Adler.pdf';
import catherineRow from './caseFiles/Rowe.pdf';
import danielKeene from './caseFiles/Keene.pdf';
import reneeCarter from './caseFiles/Carter.pdf';
import margaretVance from './caseFiles/Vance.pdf';

import packet2 from './caseFiles/packet2.pdf';
import packet3 from './caseFiles/packet3.pdf';

const FilesModal = () => {
  const [isOpen, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);
  const location = useLocation();
  const pathname = location.pathname;
  console.log(location.pathname);

  const showPacket2 = pathname === '/eleanor/2' || pathname === '/eleanor/3';
  const showPacket3 = pathname === '/eleanor/3';
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
              <a href={msdsFiles}>MSDS files</a>
            </li>
            <li>
              <a href={marcusAdler}>Marcus Adler</a>
            </li>
            <li>
              <a href={reneeCarter}>Renee Carter</a>
            </li>
            <li>
              <a href={danielKeene}>Daniel Keene</a>
            </li>
            <li>
              <a href={catherineRow}>Catherine Rowe</a>
            </li>
            <li>
              <a href={margaretVance}>Margaret Vance</a>
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
