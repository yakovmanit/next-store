import { InfoBlock } from '@/shared/components/shared';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Success denied"
        text="Log in to access this page"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
