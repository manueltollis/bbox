import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const DELAY = 300;

const GetSingleImageResponse = z.object({
  id: z.string(),
  fileName: z.string(),
  target: z.string(),
});

type GetSingleImageResponse = z.infer<typeof GetSingleImageResponse>;

const examplesImages: GetSingleImageResponse[] = [
  {
    id: "1",
    fileName: "image_01.png",
    target: "car",
  },
  {
    id: "2",
    fileName: "image_02.png",
    target: "car",
  },
  {
    id: "3",
    fileName: "image_03.png",
    target: "car",
  },
  {
    id: "4",
    fileName: "image_04.png",
    target: "car",
  },
  {
    id: "5",
    fileName: "image_05.png",
    target: "car",
  },
  {
    id: "6",
    fileName: "image_06.png",
    target: "car",
  },
  {
    id: "7",
    fileName: "image_07.png",
    target: "car",
  },
  {
    id: "8",
    fileName: "image_08.png",
    target: "car",
  },
  {
    id: "9",
    fileName: "image_09.png",
    target: "car",
  },
  {
    id: "10",
    fileName: "image_10.png",
    target: "car",
  },
  {
    id: "11",
    fileName: "image_11.png",
    target: "car",
  },
];

/**
 * This hooks wraps the useQuery hook from react-query to get a single image, it represents the endpoint /Rapids/BoundingBox/GetSingle
 * and returns a promise with the response of the request.
 *
 * For the sake of this example, the pictures are saved in the public folder and here I just randomize which picture to return.
 */

export const useGetImage = () => {
  return useQuery({
    queryKey: ["bbox", "single-image"],
    queryFn: async () => {
      return new Promise<GetSingleImageResponse>((resolve, reject) => {
        setTimeout(() => {
          const value = GetSingleImageResponse.safeParse(
            examplesImages[Math.floor(Math.random() * examplesImages.length)],
          );

          if (value.success) {
            resolve(value.data);
          } else reject(value.error);
        }, DELAY);
      });
    },
    staleTime: 0,
  });
};
