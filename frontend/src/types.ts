export type User = {
  email: string;
};

export type ApplicationData = {
  visaType: "F - Student" | "H1B - Specialty Occupation" | "J - Exchange Program",
  passportType: "tourist" | "diplomatic" | "official",
  passportCountry: string,  // TODO: enum
  passportBookNumber: string,
  passportIssuanceDate: Date,
  passportExpirationDate: Date,
  surname: string,
  givenName: string,
  nativeAlphabetName: string | null,
  otherNames: string[],  
}

export type Application = {
  userEmail: string,
  id: string,
  data: ApplicationData,
  lastModifiedAt: Date,
  createdAt: Date,
}