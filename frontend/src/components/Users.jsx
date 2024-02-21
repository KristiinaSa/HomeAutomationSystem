import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyUsers } from "../dummyData/dummyUsers";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
    return (
        <div>
            <h2>Users</h2>
            
                {dummyUsers.map((user) => (
                    <div key={user.id}>
                        <h4>{user.name}</h4>
                         {user.role}
                         <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                ))}
            
        </div>
    );
}

export default Users;