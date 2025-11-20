import gordyNote from './assets/ransom/gordy-note.png';
import darlaNote from './assets/ransom/darla-note.png';
import marthaNote from './assets/ransom/martha-note.png';
import aaronNote from './assets/ransom/aaron-note.png';
import { useState } from 'react';
import { Modal, Image, Button, Card } from 'react-bootstrap';
import { DOC_REPLACEMENT_TEXT } from './constants';
import { removeRegexPatterns } from './utils';
import fileIcon from './assets/noun-files-drawer-5459265-9B9B9B.png';
import cityHallPicture from './assets/cityHall.png';
import recording from './assets/recording.png';

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
    // docContent: 'I AM A RECORDING',
    docImage: recording,
    id: 'recording',
    show: false,
    regex: [/SHOW_RECORDING/i],
  },
  {
    label: 'City Hall Picture',
    docImage: cityHallPicture,
    id: 'cityHall',
    show: false,
    regex: [/SHOW_CITY_HALL_PICTURE/i],
  },
];

export const getDoc = (response: string) => {
  return docList.find((doc) => doc.regex.some((regex) => regex.test(response)));
};

export const getAllDocs = (response: string) => {
  return docList.filter((doc) =>
    doc.regex.some((regex) => regex.test(response)),
  );
};

export const useDocsDrawer = () => {
  const [docs, setDocs] = useState([...docList]);

  const setDocShowById = (id: string, show: boolean) => {
    setDocs((prevDocs) =>
      prevDocs.map((doc) => (doc.id === id ? { ...doc, show } : doc)),
    );
  };

  const setDocShow = (response: string, show: boolean) => {
    const doc = getDoc(response);
    if (doc) {
      setDocShowById(doc.id, show);
      return removeRegexPatterns(response, doc.regex, DOC_REPLACEMENT_TEXT);
    }
    return response;
  };

  const setAllDocsShow = (response: string, show: boolean) => {
    const matchingDocs = getAllDocs(response);
    const matchingDocIds = new Set(matchingDocs.map((doc) => doc.id));

    // Update all matching docs in a single state update
    setDocs((prevDocs) =>
      prevDocs.map((doc) =>
        matchingDocIds.has(doc.id) ? { ...doc, show } : doc,
      ),
    );

    // Remove all doc regex patterns from the response
    return matchingDocs.reduce((cleanedResponse, doc) => {
      return removeRegexPatterns(
        cleanedResponse,
        doc.regex,
        DOC_REPLACEMENT_TEXT,
      );
    }, response);
  };

  return { setDocShow, setAllDocsShow, setDocShowById, docs };
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
