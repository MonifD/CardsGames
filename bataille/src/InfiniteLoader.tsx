import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

type Comment = {
  id: number;
  body: string;
  name: string;
};

const fetchData = async (page: number): Promise<Comment[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=100`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default function InfiniteLoader() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading, 
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["posts"],
    queryFn: ({ pageParam: page }) => fetchData(page),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 100 ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500
      ) {
        // Rechercher la page suivante si disponible
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const comments = data?.pages.flatMap((comments) => comments);

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Une erreur est survenue...</p>;

  return (
    <div className="p-2">
      <ul>
        {comments?.map((comment) => {
          return (
            <li
              className="w-full p-2 border-[1px] border-black mb-2"
              key={comment.id}
            >
              <span className="font-bold inline-block w-full">
                {comment.name}
              </span>
              {comment.body}
            </li>
          );
        })}
      </ul>
      {isFetchingNextPage && <p>Chargement suivant...</p>}
    </div>
  );
}
