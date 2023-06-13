import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { fetchNui } from '../../utils/fetchNui';
import { useCompany } from '../Company';

function ChangeGrade() {
    const { paginate, cache } = useCompany();
    const [grades, setGrades] = useState([]);
    useEffect(() => {
        const get = () => fetchNui('getGrades').then(setGrades);

        get();
    }, []);

    useEffect(() => {
        console.log(grades);
    }, [grades]);
    return (
        <div className="page bg-[#EBEBEB] px-2 pt-8">
            <FaChevronLeft onClick={e => paginate('userProfile')} />
            <div className="mt-5 divide-y rounded-md bg-white ">
                {grades
                    ?.sort(function (a, b) {
                        return b.level - a.level;
                    })
                    .map(grade => (
                        <p
                            onClick={e => {
                                fetchNui('setGrade', {
                                    source: cache.user.empSource,
                                    grade
                                });
                                paginate('userProfile');
                            }}
                            className="cursor-pointer p-2 px-4"
                        >
                            {grade.name}
                        </p>
                    ))}
            </div>
        </div>
    );
}

export default ChangeGrade;
