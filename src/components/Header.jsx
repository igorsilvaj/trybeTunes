import React, { useEffect, useRef, useState } from 'react';
import { getUser } from '../services/userAPI';
import { Loading } from '.';

export default function Header() {
  const firstUpdate = useRef(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firstUpdate) {
      const getUserName = async () => {
        setLoading(true);
        const result = await getUser();
        setName(result.name);
        setLoading(false);
      };
      getUserName();
    }
    firstUpdate.current = false;
  }, []);

  return (
    <div data-testid="header-component">
      {
        loading
          ? <Loading />
          : (
            <p data-testid="header-user-name">
              {name}
            </p>
          )
      }
    </div>
  );
}
