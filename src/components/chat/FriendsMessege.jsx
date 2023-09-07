export default function FriendsMessege({ userID, data }) {
  const name = userID.toString().substring(0, 3);
  return (
    <>
      <div className="max-w-[70%] px-2 py-0.5 rounded-md bg-slate-300 float-left ml-2 my-2 shadow-md">
        <p className=" text-green-800 text-xs float-left font-bold pb-1 my-2  block w-full">
          {name}
        </p>
        <hr></hr>
        <p className="text-slate-800 text-2xl text-left">{data}</p>

        <p className="text-slate-900 text-[0.5rem] float-right">{`${new Date().getHours()}:${new Date().getMinutes()} ${
          new Date().getHours() > 12 ? "PM" : "AM"
        }`}</p>
      </div>
    </>
  );
}
