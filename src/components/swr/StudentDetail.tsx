import * as React from 'react';
import useSWR from 'swr';
export interface StudentDetailProps {
  studentId: string;
}

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  });
  const handleClick = () => {
    mutate({ name: 'hello there' }, { revalidate: true });
  };
  return (
    <div>
      Name: {data?.name || '--'} <button onClick={handleClick}>mutate</button>
    </div>
  );
}
