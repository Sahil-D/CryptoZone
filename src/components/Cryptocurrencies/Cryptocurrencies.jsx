import { useEffect, useState } from 'react';
import millify from 'millify';
import { Card, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';

import { Loader } from '..';
import { useGetCryptosQuery } from '../../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching, isError } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(
      cryptoList?.data?.coins.filter((cryp) =>
        cryp.name.toLowerCase().includes(searchTerm)
      )
    );
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Loader />;

  if (isError) return 'Error while fetching!!! Please Reload.';

  return (
    <>
      {!simplified ? (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      ) : null}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((cryptoCur, index) => (
          <Col
            key={index.toString()}
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
          >
            <Link to={`/crypto/${cryptoCur.id}`}>
              <Card
                title={`${cryptoCur.rank}. ${cryptoCur.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt=""
                    src={cryptoCur.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price: {millify(cryptoCur.price)}</p>
                <p>Market Cap: {millify(cryptoCur.marketCap)}</p>
                <p>Daily Change: {millify(cryptoCur.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
