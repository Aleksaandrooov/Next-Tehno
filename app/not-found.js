import { Button } from '@/components/ui/button';
import { ChevronRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex items-center text-lg">
        <h1 className="border-r border-black py-2 pr-3 mr-3 font-medium">404</h1>
        <span className="flex items-center gap-1">
          Такая страница не найдена <ShieldAlert strokeWidth={1.5} />
        </span>
      </div>
      <Link href="/">
        <Button variant="outline" className="flex gap-1 items-center mt-2">
          На главную <ChevronRight size={18} />
        </Button>
      </Link>
    </div>
  );
}
