import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ChakraProvider,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

interface Data {
  college: string;
  address: string;
  university: string;
  district: string;
  date: string;
  students: number;
  id: number;
}

const Landing = () => {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-data', []);
    window.electron.ipcRenderer.on('sent-data', (arg) => {
      setData(arg);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer>
      <Table variant="striped">
        <TableCaption>Youth Red Cross Fund</TableCaption>
        <Thead background="red">
          <Tr>
            <Th color="white">S. No</Th>
            <Th color="white">College Name</Th>
            <Th color="white">Address</Th>
            <Th color="white">Affiliated University</Th>
            <Th color="white">District</Th>
            <Th color="white">Date</Th>
            <Th color="white" isNumeric>
              Number of students admitted
            </Th>
            <Th color="white" isNumeric>
              Amount Recieved by colleges
            </Th>
            <Th color="white" isNumeric>
              Amount Recieved by universities
            </Th>
            <Th color="white" isNumeric>
              Amount recieved by Red Cross
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((row) => (
              <Tr>
                <Td>{row.id}</Td>
                <Td>{row.college}</Td>
                <Td>{row.address}</Td>
                <Td>{row.university}</Td>
                <Td>{row.district}</Td>
                <Td>{row.date}</Td>
                <Td isNumeric>{row.students}</Td>
                <Td isNumeric>{row.students * 15}</Td>
                <Td isNumeric>{row.students * 5}</Td>
                <Td isNumeric>{row.students * 10}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default function App() {
  return (
    <Router>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/modal" element={<h1>Modal Page</h1>} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
}
