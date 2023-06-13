import React, { useState, useEffect } from 'react';
import {
    FaBox,
    FaChevronDown,
    FaDollarSign,
    FaUser,
    FaUsers
} from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import PageAnimation from '../components/PageAnimation';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import Modal from '../components/Modal';
import { BsBoxArrowInRight, BsCheck2Circle } from 'react-icons/bs';

const JobContext = React.createContext([]);
const useJobs = () => React.useContext(JobContext);

function JobCenter() {
    const [activePage, setActivePage] = useState('home');
    const [pageData, setPageData] = useState('');
    const [playerDetails, setPlayerDetails] = useState({});
    const [jobs, setJobs] = useState([]);

    const changePage = page => setActivePage(page);

    const values = {
        changePage,
        setPageData,
        pageData,
        playerDetails,
        jobs,
        setJobs
    };

    useNuiEvent('setPlayerDetails', setPlayerDetails);

    useEffect(() => {
        const getPlayerDetails = () =>
            fetchNui('getPlayerDetails').then(setPlayerDetails);

        getPlayerDetails();
    }, []);

    useEffect(() => {
        const getJobs = () => fetchNui('jobcenter_getJobs').then(setJobs);

        getJobs();
    }, []);

    return (
        <div className="page bg-[#f3f1f8] dark:bg-black">
            <div className="flex h-full w-full flex-col p-3">
                <div className="my-2">
                    <JobContext.Provider value={values}>
                        {activePage == 'home' && <HomePage />}
                        {activePage == 'jobdetails' && <JobDetail />}
                        {activePage == 'groupdetails' && <GroupDetails />}
                        {activePage == 'groupstages' && <GroupStages />}
                    </JobContext.Provider>
                </div>
            </div>
        </div>
    );
}

const HomePage = () => {
    const [groups, setGroups] = useState([]);

    const { changePage, setPageData, jobs } = useJobs();

    return (
        <div className="h-full w-full">
            <p className="inter mb-3 text-xl font-semibold text-[#394154]">
                İş Merkezi
            </p>

            {jobs.map(x => (
                <Item
                    data={x}
                    changePage={changePage}
                    setPageData={setPageData}
                />
            ))}
        </div>
    );
};

const Item = ({ data, setPageData, changePage }) => {
    const [open, setOpen] = useState(false);

    const redirect = () => {
        changePage('jobdetails');
        // setPageData(data.name)
        setPageData(data);
    };
    return (
        <div
            onClick={redirect}
            className="job-item-shadow my-2 flex w-full items-center rounded-[10px] bg-[#FEFFFE] px-[10px] py-[7px]"
        >
            <div
                className="mr-[9px] flex h-[54px] w-[54px] items-center justify-center rounded-lg"
                style={{ backgroundColor: data.color }}
            >
                <img src={data.image} />
            </div>

            <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <p className="inter text-sm font-medium text-[#394154]">
                        {data.label}
                    </p>
                    <div className="flex items-center">
                        <p className="inter mr-[2px] text-xs text-[#0C9E41]">
                            $
                        </p>
                        <div
                            className={`mr-[1px] h-1 w-[13px] rounded-[20px] bg-[#0C9E41] ${
                                data.gain >= 1 ? 'opacity-100' : 'opacity-50'
                            }`}
                        ></div>
                        <div
                            className={`mr-[1px] h-1 w-[13px] rounded-[20px] bg-[#0C9E41] ${
                                data.gain >= 2 ? 'opacity-100' : 'opacity-50'
                            }`}
                        ></div>
                        <div
                            className={`mr-[1px] h-1 w-[13px] rounded-[20px] bg-[#0C9E41] ${
                                data.gain >= 3 ? 'opacity-100' : 'opacity-50'
                            }`}
                        ></div>
                        <div
                            className={`mr-[1px] h-1 w-[13px] rounded-[20px] bg-[#0C9E41] ${
                                data.gain >= 4 ? 'opacity-100' : 'opacity-50'
                            }`}
                        ></div>
                        <div
                            className={`mr-[1px] h-1 w-[13px] rounded-[20px] bg-[#0C9E41] ${
                                data.gain >= 5 ? 'opacity-100' : 'opacity-50'
                            }`}
                        ></div>
                    </div>
                    <div className="flex items-center">
                        <div className="inter mr-2 flex h-[15px] min-w-[29px] items-center justify-between gap-1 rounded-3xl bg-[#EDEDED] p-2 text-xs">
                            <p>{data.maxUser}</p>
                            <FaIcons.FaUserAlt className="h-2 w-2" />
                        </div>
                        <div className="inter flex h-[15px] min-w-[29px] items-center justify-between gap-1 rounded-3xl bg-[#EDEDED] p-2 text-xs">
                            <p>0</p>
                            <FaIcons.FaUsers className="h-2 w-2" />
                        </div>
                    </div>
                </div>
                <FaIcons.FaChevronRight />
            </div>
        </div>
    );
};

const JobDetail = () => {
    const { changePage, pageData, playerDetails } = useJobs();

    const [modalDisplay, setModalDisplay] = useState(false);

    const openModal = () => {
        setModalDisplay(!modalDisplay);
    };

    const createGroup = texts => {
        fetchNui('jobcenter_CreateJobGroup', {
            ...texts,
            job: pageData.name
        }).then(openModal);
        console.log(texts);
    };

    const inputs = [
        {
            name: 'name',
            placeholder: 'Grup Adı'
        }
    ];

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const getGroups = () => fetchNui('GetGroupsApp').then(setGroups);

        getGroups();
    }, []);

    useNuiEvent('refreshApp', setGroups);

    return (
        <div className="absolute top-0 left-0 flex h-full w-full flex-col bg-[#F4F6FE] pt-8">
            {modalDisplay && (
                <Modal
                    onClose={openModal}
                    onSubmit={createGroup}
                    inputs={inputs}
                    header="Grup adını giriniz"
                />
            )}

            <div className="inter mb-[10px] flex justify-between px-4">
                <p
                    onClick={() => changePage('home')}
                    className="cursor-pointer"
                >
                    {' '}
                    {'<'}{' '}
                </p>
                <p className="inter text-base font-semibold text-[#394154]">
                    {pageData.label}
                </p>
                <div></div>
            </div>

            <div className="w-full flex-1 bg-white px-4 py-3">
                <div className="flex w-full items-center  rounded-xl bg-[#ECF2FE] py-3 pl-4 pr-1 text-[#3F7CF8]">
                    <FaIcons.FaInfoCircle />
                    <p className="inter ml-2 flex-1 text-[11px] font-medium leading-[11px]">
                        Müsait bir gruba katılın ya da şuanda meşgul olan
                        gruplara göz atın.
                    </p>
                </div>

                <div className="mt-2 grid grid-cols-2 justify-between gap-2">
                    <div
                        onClick={openModal}
                        className="inter cursor-pointer rounded-lg bg-[#37BE5D] py-1 px-6 text-center text-xs text-white"
                    >
                        Grup Oluştur
                    </div>
                    <div className="inter cursor-pointer rounded-lg bg-[#3F7CF8] py-1 px-6 text-center text-xs text-white">
                        İşaretle
                    </div>
                </div>

                <div className="mt-[23px]">
                    <p className="inter text-sm font-semibold text-[#394154]">
                        Müsait Gruplar
                    </p>

                    {groups
                        ?.filter(x => x.job == pageData.name)
                        ?.map(grp => (
                            <div className="inter mb-2 rounded-lg bg-[#E0F3F0] px-3 py-2">
                                <div className="flex items-center justify-between gap-1">
                                    <div className="flex items-center gap-1">
                                        <p className="inter text-base font-medium text-[#00786A]">
                                            {grp.GName}
                                        </p>
                                        <div className="flex items-center gap-1 rounded-3xl bg-[#CAE6E4] px-3 py-0.5">
                                            <p className="inter text-xs">
                                                {grp.members.length}
                                            </p>
                                            <FaUser className="h-[10px] w-[10px]" />
                                        </div>
                                    </div>
                                    {playerDetails?.group == grp.id ? (
                                        <div
                                            onClick={() =>
                                                changePage('groupdetails')
                                            }
                                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#CAE6E4]"
                                        >
                                            <FaIcons.FaChevronRight />
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                fetchNui(
                                                    'jobcenter_JoinTheGroup',
                                                    grp
                                                )
                                            }
                                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#CAE6E4]"
                                        >
                                            <BsBoxArrowInRight className="text-sm" />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-2">
                                    {grp.members.map(x => (
                                        <div className="flex items-center gap-1">
                                            <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                                            <p className="text-sm text-[#00786A]">
                                                {x.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

function GroupDetails() {
    const { changePage, playerDetails, jobs } = useJobs();

    const [group, setGroup] = useState({});

    useEffect(() => {
        const getGroupData = () =>
            fetchNui('getGroupData', playerDetails?.group).then(setGroup);

        getGroupData();
    }, []);

    const leaveGroup = () => {
        if (playerDetails.src == group.leader) {
            fetchNui('jobcenter_DeleteGroup', group);
        } else {
            fetchNui('jobcenter_leave_grouped', group);
        }
        changePage('jobdetails');
    };

    return (
        <div className="absolute top-0 left-0 flex h-full w-full flex-col overflow-y-auto bg-[#F4F6FE] pt-8">
            <div className="inter mb-[10px] flex justify-between px-4">
                <p
                    onClick={() => changePage('jobdetails')}
                    className="cursor-pointer"
                >
                    {' '}
                    {'<'}{' '}
                </p>
                <p className="inter text-base font-semibold text-[#394154]">
                    {group.GName}
                </p>
                <div></div>
            </div>

            <div className="w-full flex-1  overflow-y-auto scroll-smooth px-4 py-2">
                <div className="mt-2 grid grid-cols-2 justify-between gap-2">
                    <div className="inter cursor-pointer rounded-lg bg-[#37BE5D] py-1 px-6 text-center text-xs text-white">
                        İşaretle
                    </div>
                    <div
                        onClick={leaveGroup}
                        className="inter cursor-pointer rounded-lg bg-[#DE2B35] py-1 px-6 text-center text-xs text-white"
                    >
                        {playerDetails.src == group.leader
                            ? 'Grubu Sil'
                            : 'Gruptan Ayrıl'}
                    </div>
                </div>

                <div
                    onClick={() => changePage('groupstages')}
                    className="job-details-shadow mt-4 flex items-center gap-2 rounded-xl bg-[#FCFCFF] p-3"
                >
                    <div
                        className="flex  h-16 w-16 items-center justify-center rounded-full"
                        style={{ backgroundColor: '#FFEFE8' }}
                    >
                        <img src="https://cdn.discordapp.com/attachments/1025484285525901374/1066024181692637226/icons8-full-trash-48.png" />
                    </div>
                    <div>
                        <p className="inter text-[#394154]">
                            {jobs?.find(x => x.name == group.job)?.label}
                        </p>
                        <p className="inter text-[10px] font-medium text-[#394154]">
                            %0 tamamlandı
                        </p>
                        <p className="inter text-[9px] font-medium text-[#394154]">
                            Aracı al ve çöpleri toplamaya başla.
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="inter text-sm font-semibold text-[#394154]">
                        Lider
                    </p>
                    <div className="job-details-shadow mt-4 flex items-center gap-2 rounded-xl bg-[#FCFCFF] p-3">
                        <div
                            className="flex  h-10 w-10 items-center justify-center rounded-full"
                            style={{ backgroundColor: '#FFEFE8' }}
                        >
                            <img
                                src={
                                    group?.members?.find(
                                        x => x.Player == group.leader
                                    ).avatar
                                }
                            />
                        </div>
                        <div>
                            <p className="inter font-semibold text-[#394154]">
                                {
                                    group?.members?.find(
                                        x => x.Player == group.leader
                                    ).name
                                }
                            </p>
                        </div>
                    </div>

                    <p className="inter mt-4 text-sm font-semibold text-[#394154]">
                        Üyeler
                    </p>
                    {group?.members?.map(
                        x =>
                            x.Player != group.leader && (
                                <div className="job-details-shadow mt-4 flex items-center gap-2 rounded-xl bg-[#FCFCFF] p-3">
                                    <div
                                        className="flex  h-10 w-10 items-center justify-center rounded-full"
                                        style={{ backgroundColor: '#FFEFE8' }}
                                    >
                                        <img src={x.avatar} />
                                    </div>
                                    <div>
                                        <p className="inter font-semibold text-[#394154]">
                                            {x.name}
                                        </p>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}

function GroupStages() {
    const { changePage, jobs, playerDetails } = useJobs();
    const [stages, setStages] = useState([]);
    useNuiEvent('addGroupStage', setStages);

    useEffect(() => {
        const getStages = () => fetchNui('jobcenter_getGroupStage');

        getStages();
    }, []);

    const [group, setGroup] = useState({});

    useEffect(() => {
        const getGroupData = () =>
            fetchNui('getGroupData', playerDetails?.group).then(setGroup);

        getGroupData();
    }, []);

    return (
        <div className="absolute top-0 left-0 flex h-full w-full flex-col overflow-y-auto bg-[#F4F6FE] pt-8">
            <div className="inter mb-[10px] flex justify-between px-4">
                <p
                    onClick={() => changePage('groupdetails')}
                    className="cursor-pointer"
                >
                    {' '}
                    {'<'}{' '}
                </p>
                <p className="inter text-base font-semibold text-[#394154]">
                    Nano
                </p>
                <div></div>
            </div>

            <div className="w-full flex-1  overflow-y-auto scroll-smooth px-4 py-2">
                <div className="job-details-shadow flex items-center rounded-lg bg-white p-2">
                    <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-purple-500 text-xl text-white "></div>
                    <div>
                        <p className="inter text-sm font-semibold leading-4 text-[#394154]">
                            {jobs?.find(x => x.name == group.job)?.label}
                        </p>
                        <p className="inter text-xs text-[#394154]">
                            %25 tamamlandı
                        </p>
                    </div>
                </div>

                {stages?.map(x => (
                    <div
                        className="relative mt-5 flex w-full items-center"
                        style={{ marginTop: x.id == 1 ? '1.25rem' : '2.25rem' }}
                    >
                        <div
                            className={`flex h-9 w-9 items-center justify-center text-xl text-white ${
                                x.isDone ? 'bg-green-500' : 'bg-[#3F7CF8]'
                            } job-details-shadow mr-2 rounded-full`}
                        >
                            {x.isDone ? (
                                <BsCheck2Circle />
                            ) : (
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect width="10" height="10" fill="white" />
                                    <rect
                                        x="11"
                                        width="10"
                                        height="10"
                                        fill="white"
                                        fill-opacity="0.6"
                                    />
                                    <rect
                                        x="11"
                                        y="11"
                                        width="10"
                                        height="10"
                                        fill="white"
                                        fill-opacity="0.6"
                                    />
                                    <rect
                                        y="11"
                                        width="10"
                                        height="10"
                                        fill="white"
                                        fill-opacity="0.6"
                                    />
                                </svg>
                            )}
                        </div>
                        <div className="job-details-shadow flex-1 rounded-lg bg-white p-2 ">
                            <p className="inter text-xs font-semibold text-[#394154]">
                                {x.name}
                            </p>
                        </div>

                        <hr
                            className={`absolute left-4 top-10 h-7 border-x ${
                                x.isDone
                                    ? 'border-green-500'
                                    : 'border-[#3F7CF8]'
                            }`}
                        />
                    </div>
                ))}

                {/* <div className="flex items-center w-full relative mt-9">
          <div className="flex justify-center text-white text-xl items-center w-9 h-9 bg-[#3F7CF8] rounded-full mr-2 job-details-shadow">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10" height="10" fill="white"/>
              <rect x="11" width="10" height="10" fill="white" fill-opacity="0.6"/>
              <rect x="11" y="11" width="10" height="10" fill="white" fill-opacity="0.6"/>
              <rect y="11" width="10" height="10" fill="white" fill-opacity="0.6"/>
            </svg>
          </div>
          <div className="bg-white p-2 flex-1 job-details-shadow rounded-lg ">
            <p className="text-xs inter text-[#394154] font-semibold">Lorem ipsum dolor sit amet.</p>
          </div>

          <div className="absolute left-4 top-10 h-10 border-x border-[#3F7CF8]"/>
        </div> */}
            </div>
        </div>
    );
}
export default JobCenter;
