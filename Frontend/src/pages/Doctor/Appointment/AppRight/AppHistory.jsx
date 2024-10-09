import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const treatments = [
  {
    id: "#12324",
    type: "Implant",
    date: "12 Jun 2023",
    result: "Well done",
    payment: "Pending",
  },
  {
    id: "#20324",
    type: "Root canal",
    date: "4 May 2023",
    result: "Well done",
    payment: "Paid",
  },
  {
    id: "#57866",
    type: "Dentures",
    date: "2 Mar 2023",
    result: "Well done",
    payment: "Paid",
  },
];

const AppHistory = () => {
  return (
    <div className="w-[66%] p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">History Dental</h2>
      {/* <table className="w-full table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Result</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((treatment) => (
              <tr key={treatment.id}>
                <td>{treatment.id}</td>
                <td>{treatment.type}</td>
                <td>{treatment.date}</td>
                <td>{treatment.result}</td>
                <td>{treatment.payment}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Type</Th>
              <Th>Date</Th>
              <Th>Result</Th>
              <Th>Payment Status</Th>
            </Tr>
          </Thead>
          <Tbody>
          {treatments.map((treatment) => (
              <Tr key={treatment.id}>
                <Td>{treatment.id}</Td>
                <Td>{treatment.type}</Td>
                <Td>{treatment.date}</Td>
                <Td>{treatment.result}</Td>
                <Td>{treatment.payment}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AppHistory;
