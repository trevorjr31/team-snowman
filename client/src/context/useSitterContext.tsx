import { Profile } from '../interface/Profile';
import { fetchSitterProfiles } from '../helpers/APICalls/fetchSitterProfiles';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';
import DateObject from 'react-date-object';

interface SitterListingContext {
  sitterProfiles: [Profile] | null | undefined;
  sitterSearchResults: [Profile] | Profile[] | null | undefined;
  selectedSitter: Profile | null | undefined;
  selectedCity: string | null | undefined;
  selectedDates: DateObject[] | null | undefined;
  clearLandingPageData: () => void;
  selectSitter: (sitter: Profile) => void;
  updateSearch: (searchTerm: string | null, dateRange: DateObject[] | null, days?: { [id: string]: boolean }) => void;
}

export const SitterListingContext = createContext<SitterListingContext>({
  sitterProfiles: null,
  sitterSearchResults: null,
  selectedSitter: null,
  selectedCity: null,
  selectedDates: null,
  clearLandingPageData: () => null,
  selectSitter: (sitter: Profile) => null,
  updateSearch: (searchTerm: string | null, dateRange: DateObject[] | null, days?: { [id: string]: boolean }) => null,
});

export const SitterListingProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [sitterProfiles, setSitterProfiles] = useState<[Profile] | null | undefined>();
  const [sitterSearchResults, setSitterSearchResults] = useState<[Profile] | Profile[] | null | undefined>();
  const [selectedSitter, setSelectedSitter] = useState<Profile | null | undefined>();
  const [selectedCity, setSelectedCity] = useState<string | null | undefined>();
  const [selectedDates, setSelectedDates] = useState<DateObject[] | null | undefined>();
  const filterByDateRange = (dateRange: DateObject[] | Date[] | null, days?: { [id: string]: boolean }) => {
    if (sitterProfiles) {
      let updatedSitterList = Array.from(sitterProfiles);
      days = {};
      for (let i = 1; i < 8; i++) {
        const date = new DateObject(`11/0${i}/2021`).format('dddd');
        days[date] = false;
      }
      if (dateRange?.length) {
        updatedSitterList = updatedSitterList.filter((sitter) => {
          if (!sitter.availability.length) {
            return false;
          }
          for (const i of sitter.availability) {
            const date = new DateObject(i.day).format('dddd');
            if (days) {
              days[date] = true;
            }
          }
          for (const i of dateRange) {
            const date = new DateObject(i).format('dddd');
            if (days && !days[date]) {
              return false;
            }
          }
          return true;
        });
      }
      return updatedSitterList;
    }
  };

  const clearLandingPageData = () => {
    setSelectedCity(null);
    setSelectedDates(null);
  };

  const updateSearch = (searchTerm: string | null, dateRange: DateObject[] | null) => {
    if (sitterProfiles) {
      if (!dateRange && !searchTerm) {
        setSitterSearchResults(sitterProfiles);
      }
      let updatedSitterList = filterByDateRange(dateRange);
      if (searchTerm) {
        updatedSitterList = updatedSitterList?.filter((sitter) => {
          return sitter.address.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
      setSitterSearchResults(updatedSitterList);
      setSelectedCity(searchTerm);
      setSelectedDates(dateRange);
    }
  };

  const selectSitter = (sitter: Profile) => {
    setSelectedSitter(sitter);
  };

  useEffect(() => {
    const getProfiles = async () => {
      const fetchedProfiles = await fetchSitterProfiles();
      setSitterProfiles(fetchedProfiles);
      setSitterSearchResults(fetchedProfiles);
    };
    getProfiles();
  }, []);

  return (
    <SitterListingContext.Provider
      value={{
        sitterProfiles,
        sitterSearchResults,
        updateSearch,
        selectSitter,
        clearLandingPageData,
        selectedSitter,
        selectedCity,
        selectedDates,
      }}
    >
      {children}
    </SitterListingContext.Provider>
  );
};

export function useSitters(): SitterListingContext {
  return useContext(SitterListingContext);
}
