import Img from "../assets/static/user.jpg"

const User = ({ user, selectUser }) => {

    return <div className="mb-2.5 p-2.5 cursor-pointer" name="user_wrapper" onClick={() => selectUser(user)}>
        <div className="flex justify-between items-center" name="user_info">
            <div className="flex items-center" name="user_detail">
                <img src={ Img } alt="avatar" className="w-14 h-12 rounded-md border-1 border-gray-200"/>
                <h4 className="ml-2.5" name="user_detail h4">{user.displayName || ((user.email).split("@"))[0] }</h4>
            </div>
            <div className={ `w-2.5 h-2.5 rounded-md ${user.isOnline ? `bg-green-500 shadow`:`bg-red-500 shadow`}` }></div>
        </div>
    </div>
}

export default User;