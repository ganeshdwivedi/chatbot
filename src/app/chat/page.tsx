import ChatView from "@/components/ValidationChat";

type PageProps = {
  searchParams: {
    designation?: string;
    role?: string;
    field?: string;
    experience?: string;
    difficulty?: string;
  };
};

export default function Page({ searchParams }: PageProps) {
  const { designation, role, field, experience, difficulty } = searchParams;

  return (
    <ChatView
      designation={designation}
      role={role}
      field={field}
      experience={experience}
      difficulty={difficulty}
    />
  );
}
