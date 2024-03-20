import { useMutation } from "@tanstack/react-query";

const DELAY = 300;

type Payload = {
  id: string;
  boundingBox: {
    topLeft: {
      x: number;
      y: number;
    };
    bottomRight: {
      x: number;
      y: number;
    };
  };
};

/**
 * Here I'm using the useMutation for what would be the submit action of the bounding box.
 * It represents the endpoint /Rapids/BoundingBox/AddUserGuess
 */

export const useSubmitBoundingBox = () => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Submitted", payload);
          resolve(null);
        }, DELAY);
      });
    },
  });
};
