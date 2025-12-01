import { memo } from "react";
import Link from "next/link";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function ProductCard({ p }) {
  return (
    <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
      <Card>
        <CardMedia component="img" height="180" image={p.thumbnail} />
        <CardContent>
          <Typography variant="h6">{p.title}</Typography>
          <Typography>₹ {p.price}</Typography>
          <Typography>Rating: {p.rating}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default memo(ProductCard);
