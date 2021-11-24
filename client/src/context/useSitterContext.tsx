import { Profile } from '../interface/Profile';
import { fetchSitterProfiles } from '../helpers/APICalls/fetchSitterProfiles';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';

interface SitterListingContext {
  sitterProfiles: [Profile] | null | undefined;
}

export const SitterListingContext = createContext<SitterListingContext>({
  sitterProfiles: null,
});

export const SitterListingProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [sitterProfiles, setSitterProfiles] = useState<[Profile] | null | undefined>();

  useEffect(() => {
    const getProfiles = async () => {
      const fetchedProfiles = await fetchSitterProfiles();
      setSitterProfiles(fetchedProfiles);
    };
    getProfiles();
  }, []);

  return <SitterListingContext.Provider value={{ sitterProfiles }}>{children}</SitterListingContext.Provider>;
};

export function useSitters(): SitterListingContext {
  return useContext(SitterListingContext);
}
