import React, { useState } from 'react';

function Example() {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div>
    console.log('Kommer jag till popup')

    {isOpen && (
        <div>
        <div>
        This is the content of the pop-up.
        
        </div>
        <button onClick={() => setIsOpen(false)}>
            Close Pop-up
        </button>
    </div>
    )}
    </div>
    );
}

export default Example;