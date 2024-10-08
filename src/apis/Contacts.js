import HttpInstance, { handleError } from "./axios";

export const CreateContact = async ({
  firstName,
  lastName,
  countryCode,
  phoneNumber,
}) => {
  try {
    const response = await HttpInstance.post("/api/v1/contacts", {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    return handleError(error)
  }
};

export const UpdateContact = async ({
  firstName,
  lastName,
  countryCode,
  phoneNumber,
  contactId,
}) => {
  try {
    const response = await HttpInstance.patch(`/api/v1/contacts/${contactId}`, {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    return handleError(error)
  }
};

export const DeleteContact = async ({ contactId }) => {
  try {
    const response = await HttpInstance.delete(`/api/v1/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    return handleError(error)
  }
};

export const GetContact = async ({ contactId }) => {
  try {
    const response = await HttpInstance.get(`/api/v1/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    return handleError(error)
  }
};

export const GetContacts = async ({ search = '', page = 1 }) => {
  try {
    const response = await HttpInstance.get(
      `/api/v1/contacts?search=${search}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log({ error })
    return handleError(error)
  }
};
