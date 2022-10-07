import React, { useState, useEffect } from 'react';
import { createClient } from 'urql';
import Table from '../../Molecules/Table';
import NoRecord from '../../Molecules/NoRecord';
import { Spinner } from '../../Atom/Spinner';
import { useSelector } from 'react-redux';
import {IRootState} from "../../../redux/store"
import {BigNumber} from "ethers"

const userName = (uname:string) => (
  <span title={uname}>{uname.slice(0, 8) + '...'}</span>
);
const columns:{heading:string,value:string}[] = [
  { heading: 'S.no', value: 'sNo' },
  { heading: 'User Id', value: 'userId' },
  { heading: 'User Name', value: 'userName' },
  { heading: 'Name', value: 'name' },
];

type UsersDataTypes={
  id:string
  userId:string
  name:string
  username:BigNumber
}

type RowDataType={
        sNo: number,
        userId:string,
        userName:React.ReactNode,
        name: string
}


const RegisteredUser = () => {
  const chainData = useSelector((state:IRootState) => state.ChainDataReducer);
  const [loading, setLoding] = useState(false);
  const [data, setData] = useState<UsersDataTypes[]>([]);
  const [rowsData, setRowsData] = useState<RowDataType[]>([]);

  useEffect(() => {
    fetchUsersData();
  }, [chainData.subgraphApiUrl]);

  useEffect(() => {
    calculateRowData();
  }, [data]);

  const fetchUsersData = async () => {
    const usersQuery = `
      query {
      users{
      id
      userId
      name
      username
      }
      }
      `;

    setLoding(true);
    try {
      const client = createClient({
        url: chainData.subgraphApiUrl,
      });
      const data = await client.query(usersQuery,{}).toPromise();

      if (data.data.users) {
        setData(data.data.users);
      }
    } catch (e) {}

    setLoding(false);
  };
  function calculateRowData() {
    let rowsData = [];
    for (let i = 0; i < data.length; i++) {
      const userData = data[i];
      const row :RowDataType= {
        sNo: i + 1,
        userId: userData.userId,
        userName: userName(""+userData.username),
        name: userData.name,
      };

      rowsData.push(row);
    }
    setRowsData(rowsData);
  }

  return (
    <div className="flex justify-center mx-5 my-10">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data.length != 0 ? (
            <Table rows={rowsData} columns={columns} tableHeight={322} />
          ) : (
            <NoRecord />
          )}
        </>
      )}
    </div>
  );
};
export default RegisteredUser;
