import React from 'react';

const Rank = ({ isSignedIn, username, entries }) => {
    return (
        <div className='rank'>
            {
                isSignedIn ?
                    <div>
                        <div className='white f3'>
                            {`${username}, your current entry count is...`}
                        </div>
                        <div className='white f1'>
                            {entries}
                        </div>
                    </div>
                    :
                    <div>
                        <div className='white f3'>
                            {`Welcome to the jungle!`}
                        </div>
                    </div>
            }
        </div >

    )

}

export default Rank;