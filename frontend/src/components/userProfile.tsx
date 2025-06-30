import { useAtom } from 'jotai';
import { userAtom } from '../utils/atoms';
import type { AppUser } from '../types/user';

import Loading from './Loading/Loading';

const UserProfile = () => {
  const [user] = useAtom(userAtom) as [AppUser | null, any];

  if (!user) return (<div><Loading/></div>);

  return (
    <div className="user-profile flex">
        <img className='profile-picture' src={user.picture.medium} alt={user.name.first}/>
        <h3 className='appear-on-hover'>{user.name.first.toUpperCase()} {user.name.last.toUpperCase()}</h3>
    </div>
  );
};

export default UserProfile;
