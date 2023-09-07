export default function MyMessege({ userID, data }) {
  const name = userID.toString().substring(0, 3);
  return (
    <>
      <div className="max-w-[70%] inline-block px-2 py-0.5 rounded-md bg-green-200 float-right mr-5 mb-3 shadow-sm">
        <p className="name text-green-800 text-xs float-right font-bold pb-0.5 block w-full ">
          {name}
        </p>

        <p className="text-slate-800 text-2xl text-right">{data}</p>

        <p className="text-slate-900 text-[0.5rem] float-right">{`${new Date().getHours()}:${new Date().getMinutes()} ${
          new Date().getHours() > 12 ? "PM" : "AM"
        }`}</p>
      </div>
    </>
  );
}
