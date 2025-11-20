
import { useState } from 'react';
import { Modal, Image, Button, Card } from 'react-bootstrap';
import fileIcon from './assets/noun-files-drawer-5459265-9B9B9B.png';
import { Doc } from './types';





export const getMatchingDocsFromResponse = (response: string, docList: Doc[]) => {
  return docList.filter((doc) =>
    doc.regex.some((regex) => regex.test(response)),
  );
};

export const useDocsDrawer = (docList: Doc[]) => {
  const [docs, setDocs] = useState([...docList]);


  const setAllDocsShow = (response: string, show: boolean) => {
    const matchingDocs = getMatchingDocsFromResponse(response, docList);
    const matchingDocIds = new Set(matchingDocs.map((doc) => doc.id));

    // Update all matching docs in a single state update
    setDocs((prevDocs) =>
      prevDocs.map((doc) =>
        matchingDocIds.has(doc.id) ? { ...doc, show } : doc,
      ),
    );
  };

  return {setAllDocsShow, docs };
};

export const DocsDrawer = ({ docs }: { docs: Doc[] }) => {
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);

  const handleOpenModal = (doc: Doc) => {
    setSelectedDoc(doc);
  };

  const handleCloseModal = () => {
    setSelectedDoc(null);
  };

  const DocsList = () => {
    const docsToShow = docs.filter((doc) => doc.show);
    if (docsToShow.length === 0) {
      return <div style={{color:'#929292'}}>No documents yet</div>;
    }
    return (
      <ul>
        {docsToShow.map((doc) => (
          <li>
            <a
              href='#'
              key={doc.id}
              role='button'
              onClick={(e) => {
                e.preventDefault();
                handleOpenModal(doc);
              }}
            >
              {doc.label}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Modal show={!!selectedDoc} onHide={handleCloseModal} size='lg'>
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>{selectedDoc?.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoc?.docContent && <div>{selectedDoc.docContent}</div>}
          {selectedDoc?.docImage && (
            <Image src={selectedDoc.docImage} alt={selectedDoc.label} fluid />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className='docsDrawer'>
        <Card.Body>
          <h2 className='h5 docsDrawer__title card-title'>
            <img src={fileIcon} alt='Files' width={30} height={30} /> Documents
            Drawer
          </h2>

          <DocsList />
        </Card.Body>
      </Card>
    </>
  );
};
