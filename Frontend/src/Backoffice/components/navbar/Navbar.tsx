import "./navbar.scss";

const Navbar = () => {

  const data = JSON.parse(localStorage.getItem('data'));
  console.log(data);
  const firstName = data && data.user ? data.user.firstName : 'DefaultName';

  return (
    <div className="navbar-back px-6">
      <div className="logo">
        <span>HandMadeHaven</span>
      </div>
      <div className="icons">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Welcome {firstName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
