import { FindSitterForm } from '../interface/FindSitterForm';
import { createContext, FunctionComponent, useState, useContext, useCallback } from 'react';

interface FindSitterFormContext {
  findSitterFormContext: FindSitterForm | null | undefined;
  updateFindSitterFormContext: (findSitterForm: FindSitterForm | null) => void;
}

export const FindSitterFormContext = createContext<FindSitterFormContext>({
  findSitterFormContext: undefined,
  updateFindSitterFormContext: () => null,
});

export const FindSitterFormProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [findSitterFormContext, setFindSitterFormContext] = useState<FindSitterForm | null | undefined>(null);

  const updateFindSitterFormContext = useCallback(
    (findSitterForm: FindSitterForm | null) => {
      setFindSitterFormContext(findSitterForm);
    },
    [setFindSitterFormContext],
  );

  return (
    <FindSitterFormContext.Provider value={{ findSitterFormContext, updateFindSitterFormContext }}>
      {children}
    </FindSitterFormContext.Provider>
  );
};

export function useFindSitterForm(): FindSitterFormContext {
  return useContext(FindSitterFormContext);
}
