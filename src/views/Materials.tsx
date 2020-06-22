import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import db from '../idb';

import Modal from '../components/Modal';
import Button from '../components/Button';

interface IMaterial {
      id?: number;
      name: string;
      manufacturer: string;
      width: number;
      fLength: number;
      price: number;
  }

function Materials() {
  const [materials, setMaterials] = useState<Array<IMaterial>>([]);
  const [newMaterial, setNewMaterial] = useState<IMaterial|null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getMaterials = async (): Promise<IMaterial[]> => (await db()).getAll('materials');
  const handleOpen = (): void => setModalOpen(true);
  const handleClose = (): void => setModalOpen(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string, isInt = false) => {
    // @ts-ignore
    setNewMaterial({ ...newMaterial, [field]: isInt ? +e.target.value : e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    await (await db()).add('materials', newMaterial);
    // @ts-ignore
    setNewMaterial(null);
    handleClose();
  };

  useEffect(() => {
    if (!newMaterial) {
      const getData = async () => {
        const res = await getMaterials();
        setMaterials(res);
      };

      getData();
    }
  }, [newMaterial]);

  return (
    <>
      <h1>Materials</h1>
      <ul>
        {materials.map((ele) => <li key={ele.id}>{JSON.stringify(ele)}</li>)}
      </ul>
      <Button onClick={handleOpen}><FontAwesomeIcon icon={faPlus} /></Button>
      <Modal open={modalOpen} close={handleClose}>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={newMaterial?.id ?? ''} />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={newMaterial?.name ?? ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
          />
          <input
            type="text"
            name="manufacturer"
            placeholder="Hersteller"
            required
            value={newMaterial?.manufacturer ?? ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'manufacturer')}
          />
          <input
            type="number"
            name="length"
            placeholder="Länge"
            required
            value={newMaterial?.fLength ?? ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'fLength', true)}
          />
          <input
            type="number"
            name="width"
            placeholder="Breite"
            required
            value={newMaterial?.width ?? ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'width', true)}
          />
          <input
            type="number"
            name="price"
            placeholder="Preis"
            required
            value={newMaterial?.price ?? ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'price', true)}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
}

export default Materials;
