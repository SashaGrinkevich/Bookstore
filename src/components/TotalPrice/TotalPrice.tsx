import React from "react";

import styles from "./TotalPrice.module.css";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";

interface TotalPriceProps {
  sumTotalPrice: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ sumTotalPrice }) => {
  const VAT = 12.5;
  let total = 0;

  if (sumTotalPrice > 0) {
    total = sumTotalPrice + VAT;
  }

  return (
    <div className={styles.total}>
      <div className={styles.price_container}>
        <div className={styles.info}>
          <Typography variant="span" color="secondary">
            Sum total
          </Typography>
          <Typography variant="span" color="primary" >
            {`$ ${sumTotalPrice.toFixed(2)}`}
          </Typography>
        </div>
        <div className={styles.info}>
          <Typography variant="span" color="secondary">
            VAT
          </Typography>
          <Typography variant="span" color="primary" >
            {`$ ${VAT.toFixed(2)}`}
          </Typography>
        </div>
      </div>
      <div className={styles.info}>
        <Typography variant="h2" color="primary" >
          Total:
        </Typography>
        <Typography variant="h2" color="primary">
          {`$ ${total.toFixed(2)}`}
        </Typography>
      </div>
      <div>
        <Button>check out</Button>
      </div>
    </div>
  );
};

export default TotalPrice;
