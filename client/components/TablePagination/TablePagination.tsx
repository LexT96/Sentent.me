import { Dispatch, SetStateAction, useEffect } from "react";
import { Pagination } from "react-bootstrap";

interface TablePaginationProps {
    pageIndexes: number[];
    setPageIndexes: Dispatch<SetStateAction<number[]>>;
    count: number;
}

export default function TablePagination({pageIndexes, setPageIndexes, count}: TablePaginationProps) {

    const onFirstClick = () => {
        setPageIndexes([0, count >= 100 ? 100 : count])
    }

    const onLastClick= () => {
        if (count <= 100) return setPageIndexes([0,count]);
        if (count % 100 == 0) return setPageIndexes([count-100, count])
        setPageIndexes([count - (count % 100),count])
    }

    const onBackButtonClick = () => {
        if (pageIndexes[0] - 100 < 0) return;
        setPageIndexes([pageIndexes[0] - 100, pageIndexes[0]]);
    }

    useEffect(() => {
        setPageIndexes([0, count >= 100 ? 100 : count])
    }, [count])

    const onNextButtonClick = () => {
        if (pageIndexes[1] === count) return;
        if (pageIndexes[1] + 100 > count) {
            const remainder = count % 100;
            setPageIndexes([pageIndexes[1], pageIndexes[1] + remainder]);
            return;
        }
        setPageIndexes([pageIndexes[1], pageIndexes[1] + 100]);
    }
    return (
      <Pagination>
        <Pagination.First onClick={onFirstClick} />
        <Pagination.Prev onClick={onBackButtonClick} />
        <Pagination.Next onClick={onNextButtonClick} />
        <Pagination.Last onClick={onLastClick} />
      </Pagination>
    );
}