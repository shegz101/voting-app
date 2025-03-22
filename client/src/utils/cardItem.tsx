import { UserRoundPen, UserRoundSearch, Vote } from "lucide-react";

const CardItem: React.FC = () => {
  return (
    <div className="mt-6 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex justify-between items-center p-4 border rounded-lg shadow-md gap-2">
        <div className="">
          <h2 className="text-sm text-slate-500">No. of Positions</h2>
          <h2 className="font-bold text-3xl">4</h2>
        </div>
        <UserRoundPen className="bg-primary rounded-full text-white p-3 h-12 w-12" />
      </div>

      <div className="flex justify-between items-center p-4 border rounded-lg shadow-md gap-2">
        <div className="">
          <h2 className="text-sm text-slate-500">No. Of Candidates</h2>
          <h2 className="font-bold text-3xl">7</h2>
        </div>
        <UserRoundSearch className="bg-primary rounded-full text-white p-3 h-12 w-12" />
      </div>

      <div className="flex justify-between items-center p-4 border rounded-lg shadow-md gap-2">
        <div className="">
          <h2 className="text-sm text-slate-500">Total Voters</h2>
          <h2 className="font-bold text-3xl">1,000</h2>
        </div>
        <Vote className="bg-primary rounded-full text-white p-3 h-12 w-12" />
      </div>
    </div>
  );
};
export default CardItem;
