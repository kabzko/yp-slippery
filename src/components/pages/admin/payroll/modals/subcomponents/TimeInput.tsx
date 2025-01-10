import { Controller } from 'react-hook-form';

const TimeInput = ({ name, control }: { name: string; control: any }) => {
  return (
    <>
      {name && (
        <div className="flex gap-4">
          <div className="w-1/2">
            <Controller
              name={`${name}_hours`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="px-3 border bg-gray-50 border-gray-300 rounded-lg h-[53.57px] w-full"
                  placeholder="Hours"
                />
              )}
            />
          </div>
          <div className="w-1/2">
            <Controller
              name={`${name}_minutes`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="px-3 border bg-gray-50 border-gray-300 rounded-lg h-[53.57px] w-full"
                  placeholder="Minutes"
                />
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TimeInput;


