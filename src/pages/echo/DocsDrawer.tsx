import gordyNote from './assets/ransom/gordy-note.png';
import darlaNote from './assets/ransom/darla-note.png';
import marthaNote from './assets/ransom/martha-note.png';
import aaronNote from './assets/ransom/aaron-note.png';
import { useState } from 'react';
import { Modal, Image, Button} from 'react-bootstrap';

export type Doc = {
  label: string;
  id: string;
  show: boolean;
  regex: RegExp[];
  docImage?: string;
  docContent?: string;
};

export const docList = [
  {
    label: 'Gordy Note',
    docImage: gordyNote,
    id: 'gordy-note',
    show: false,
    regex: [/SHOW_NOTE_Gordy/i],
  },
  {
    label: 'Darla Note',
    docImage: darlaNote,
    id: 'darla-note',
    show: false,
    regex: [/SHOW_NOTE_Darla/i],
  },
  {
    label: 'Martha Note',
    docImage: marthaNote,
    id: 'martha-note',
    show: false,
    regex: [/SHOW_NOTE_Martha/i],
  },
  {
    label: 'Aaron Note',
    docImage: aaronNote,
    id: 'aaron-note',
    show: false,
    regex: [/SHOW_NOTE_Aaron/i],
  },
  {
    label: 'Recording',
    docContent: 'I AM A RECORDING',
    id: 'recording',
    show: false,
    regex: [/SHOW_RECORDING/i],
  },
  {
    label: 'City Hall Picture',
    docContent: 'I AM AN IMAGE',
    id: 'cityHall',
    show: false,
    regex: [/SHOW_CITY_HALL_PICTURE/i],
  },
];

export const getDoc = (response: string) => {
  return docList.find((doc) => doc.regex.some((regex) => regex.test(response)));
};

export const getAllDocs = (response: string) => {
  return docList.filter((doc) => doc.regex.some((regex) => regex.test(response)));
};


export const useDocsDrawer = () => {
  const [docs, setDocs] = useState([...docList]);

  const setDocShowById = (id: string, show: boolean) => {
    setDocs(docs.map((doc) => (doc.id === id ? { ...doc, show } : doc)));
  };

  const setDocShow = (response: string, show: boolean) => {
    const doc = getDoc(response);
    if (doc) {
      setDocShowById(doc.id, show);
      return doc.regex.reduce(
        (cleanedResponse, regex) =>
          cleanedResponse.replace(regex, ' See doc drawer. '),
        response,
      );
    }
    return response;
  };

  const setAllDocsShow = (response: string, show: boolean) => {
    const matchingDocs = getAllDocs(response);
    const matchingDocIds = new Set(matchingDocs.map((doc) => doc.id));
    
    // Update all matching docs in a single state update
    setDocs((prevDocs) =>
      prevDocs.map((doc) =>
        matchingDocIds.has(doc.id) ? { ...doc, show } : doc
      )
    );
    
    // Remove all doc regex patterns from the response
    return matchingDocs.reduce((cleanedResponse, doc) => {
      return doc.regex.reduce(
        (acc, regex) => acc.replace(regex, ' See doc drawer. '),
        cleanedResponse,
      );
    }, response);
  };

  return { setDocShow, setAllDocsShow, setDocShowById, docs };
};

export const DocsDrawer = ({ docs }: { docs: Doc[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);

  const handleOpenModal = (doc: Doc) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDoc(null);
  };
  return (
    <>
      {modalOpen && (
        <Modal show={modalOpen} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedDoc?.label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
           {selectedDoc?.docContent && <div>{selectedDoc?.docContent}</div>}
           {selectedDoc?.docImage && <Image src={selectedDoc?.docImage} alt={selectedDoc?.label} fluid />}
          </Modal.Body>
        </Modal>
      )}

      <div>
        DOCS DRAWER:
        {docs.map((doc) =>
          doc.show ? <Button variant="link" key={doc.id} onClick={() => handleOpenModal(doc)}>{doc.label}</Button> : null,
        )}
      </div>
    </>
  );
};
