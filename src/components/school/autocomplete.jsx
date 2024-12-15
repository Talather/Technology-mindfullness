"use client"

import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import styles from './autocomplete.module.css';
 import { getFirestore,getDocs,collection } from "firebase/firestore"
    import { initializeApp, getApps, getApp, } from "firebase/app"



    
export default function SchoolAutocompleteComponent({
  school = {},
  control,
  errors = {},
  label = 'School',
  name = 'school',
  register,
  variant = 'default',
}) {
  const [schools, setSchools] = useState([school.id && school]);

  const classNames = {
    base: styles.base,
    clearButton: styles.clearButton,
    endContentWrapper: styles.endContentWrapper,
    listbox: styles.listbox,
    listboxWrapper: styles.listboxWrapper,
    popoverContent: styles.popoverContent,
    selectorButton: styles.selectorButton,
  };

  const getSchools = async () => {





    async function getAllSchoolsForAutoComplete() {




















      
const apiKey = import.meta.env.VITE_API_KEY
const authDomain = import.meta.env.VITE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_PROJECT_ID
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET

const messagingSenderId = import.meta.env.VITE_MESSAGE_SENDER_ID
const appId = import.meta.env.VITE_APP_ID
const dbUrl = import.meta.env.VITE_DATABASE_URL


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  databaseURL: dbUrl,
}




      const app =
          initializeApp(firebaseConfig)



      const db = getFirestore(app)


      try {
        const querySnapshot = await getDocs(collection(db, "schools"))
        const docsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        
        return { list: docsData, count: docsData.length }
      } catch (err) {
        
      } finally {
      }
    }


    const schools = await getAllSchoolsForAutoComplete(




    );

    
    setSchools(schools.list);
  };

  const handleOpenChange = async (isOpen) => {
    if (isOpen && schools.length <= 1) await getSchools();
  };

  const handleSelectionChange = (school) => {

  };


  







  return (
    <Controller control={control} defaultValue={school.id} name={name}
      render={({ field: { onBlur, onChange, value } }) => (
        <Autocomplete allowsCustomValue={true} aria-label={'School'}
          classNames={variant === 'primary' ? classNames : {}} defaultItems={schools}
          defaultSelectedKey={school.id} errorMessage={!!errors.school && 'Please select a school'}

          isInvalid={!!errors.school} label={label} labelPlacement={'outside'}
          placeholder={variant === 'primary' ? 'School' : ''}
          {...register(name, { required: true })} radius={'sm'} selectedKey={value} variant={'bordered'} onBlur={onBlur}
          onOpenChange={handleOpenChange} onSelectionChange={(value) => {
          onChange({ target: { value } });
          handleSelectionChange(value);
        }}>
          {(school) => (
            <AutocompleteItem key={school.id} value={school.id}>
              {school.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )} />
  );
}