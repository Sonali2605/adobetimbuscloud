const ProfilePage = () => {

  return (
    <div className="flex flex-1 grid grid-cols-12 h-full items-center" style={{ backgroundColor: '#EFF3F7', minHeight:'100vh'}}>
      <div className="col-span-8 h-full">
        <img src="./images/maryJaneStewart.png" alt='Image' className="h-full w-auto" />
      </div>
      <div className="col-span-4 pr-6 pl-6 h-full">
        <div className="top-element pb-4 pt-6" style={{ borderColor: '#D0D0D0', borderStyle: 'solid', borderBottomWidth: '1px'}}>
          <div style={{}} className="top-left inline-block w-2/12 align-top">
            <div className="rounded-full overflow-hidden" style={{width:50, height:50}}>
            <img src="./images/maryJaneStewart.png" alt='Image' className="w-fit h-full" />
            </div>
          </div>
          <div className="top-right inline-block w-10/12 align-top">
            <h2 className="font-bold">Olivia Clarke</h2>
            <p>Business Growth Leader, </p>
            <p>True Blue Agents</p>
          </div>
        </div>
        <div className="bottom-element mt-3">
          <p className='mb-2'>Olivia Clarke runs a full-house with a team of 13 agents spread across 6 states of United States. Olivia Clarke knows the importance of training in achieving high-performance sales numbers. Her Power BI dashboard is connected to Adobe Learning Manager so that she can view the performance of her sales team on the go and correlated with their learnings as well.</p>
          <p className='mb-2'>Olivia Clarke’s dashboard looks like this.</p>
        </div>

      </div>

    </div>
  );
}

export default ProfilePage;
