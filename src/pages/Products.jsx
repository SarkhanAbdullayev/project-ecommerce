import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setProduct } from '../Redux/reducer/currentProduct';

import Accordion from 'react-bootstrap/Accordion';
import commerce from '../commerce/commerce';
import '../styles/products/products.css'
import checked from '../assets/products/checked.svg'
import sortSvg from '../assets/products/sort.svg'
import filter from '../assets/products/filter.svg'
import { GridLoader } from 'react-spinners';
import { GrFormClose } from 'react-icons/gr'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import BasicSelect from '../components/products/Select';




function Products() {


  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const brand = searchParams.get('brand');
  const kategoriya = searchParams.get('kategoriya');
  const priceCategory = searchParams.get('qiymət');
  const sort = searchParams.get('sort');

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceCategories, setPriceCategories] = useState([]);
  
  const [params, setParams] = useState(brand ? [brand] : [])
  const [categoryParams, setCategoryParams] = useState(kategoriya ? [kategoriya] : [])
  const [priceParams, setPriceParams] = useState(priceCategory ? [priceCategory] : [])
  const [sortParams, setSortParams] = useState(sort ? [sort] : [])

  const [loading, setLoading] = useState(false)
  const [listLoading, setListLoading] = useState(false);

  const [products, setProducts] = useState([]);
  
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(1)
  const [priceSort, setPriceSort] = useState(sort ? sort : 'new');

  const x = window.matchMedia("(max-width: 600px)")
  const [showFilterWindow, setShowFilterWindow] = useState(!x.matches);




  // useEffect at the first time set categories to render
  useEffect(() => {
    setLoading(true)
    async function getCategories() {
      const { data } = await commerce.categories.list();
      setBrands(data[2].children);
      setCategories(data[1].children);
      setPriceCategories(data[0].children);
      setLoading(false)
    }
    getCategories()
  }, [])


  //* getProducts
  useEffect(() => {
    async function getProducts() {
      setListLoading(true);
      if (location.search == "") {
        const { data, meta } = await commerce.products.list({
          sortBy: priceSort == 'new' ? 'created' : 'price',
          sortDirection: priceSort == 'new' ? 'none' : priceSort,
          limit: 6,
          page,
        });
        setPagesCount(meta.pagination);
        setProducts(data);
        setListLoading(false);
      }
      else {
        const { data, meta } = await commerce.products.list({
          category_slug: [...params, ...categoryParams, ...priceParams],
          limit: 6,
          page,
          sortBy: priceSort == 'new' ? 'created' : 'price',
          sortDirection: priceSort == 'new' ? 'none' : priceSort,
        })
        setPagesCount(meta.pagination);
        setProducts(data);
        setListLoading(false);
      }
    }
    getProducts()
  }, [brand, kategoriya, priceCategory, searchParams, page, priceSort,location.search])

  //* Url params changer
  useEffect(() => {
    const obj = {}
    if (params.length > 0) {
      obj.brand = params
    }
    if (categoryParams.length > 0) {
      obj.kategoriya = categoryParams
    }
    if (priceParams.length > 0) {
      obj.qiymət = priceParams
    }
    if (sortParams.length > 0) {
      obj.sort = sortParams
    }
    setSearchParams(obj)

  },[params, categoryParams, priceParams, sortParams])


  //* Filter check funtions
  function handleBrandCheck(e) {
    params.includes(e.target.value) ? setParams([]) : setParams([e.target.value])
  }
  function handleCategoryCheck(e) {
    categoryParams.includes(e.target.value) ? setCategoryParams([]) : setCategoryParams([e.target.value])
  }
  function handlePriceCheck(e) {
    priceParams.includes(e.target.value) ? setPriceParams([]) : setPriceParams([e.target.value])
  }
  function handleSortSelect(e) {
    setSortParams([e?.target?.value])
  }



  //*--- Pagination ---//
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };
  function PaginationRounded({ count }) {
    return (
      <Stack spacing={2}>
        <Pagination count={count.total_pages} shape="rounded" page={page} onChange={handleChange} />
      </Stack>
    );
  }

  return (
    <div className="products">
      {loading ? <GridLoader color='#2DD06E' className='gridLoader' /> : <><div className="sortFilter">
        <div className="mobileSort">
          <img className='mobileSortImg' src={sortSvg} alt="" />
          <p className='MobileSortP'>Sıralama</p>
        </div>
        <div className="filter" onClick={() => setShowFilterWindow(true)}>
          <img className='filterImg' src={filter} alt="" />
          <p className='filterP'>Filterləmələr</p>
        </div>
      </div>
        <Accordion className='accordionDiv' defaultActiveKey={['0']} alwaysOpen style={{ transform: `translateY(${showFilterWindow ? '0' : '-100%'})` }}>
          <div className="filterClose flex items-center h-16">
            <GrFormClose fontSize='28' onClick={() => setShowFilterWindow(false)} />
            <p className='text-xl font-medium'>Filterləmələr</p>
          </div>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Brend</Accordion.Header>

            <Accordion.Body className='accord'>
              {brands.map((el, i) => {
                if ((el.name != 'Bütün Brendlər') && (el.name != 'Aksesuarlar')) {
                  return (
                    <div key={el.id} className={`${el.name} category`}>
                      <input type="checkbox" checked={params.includes(el.name)} value={el.name} className='checkInput' id={i} onChange={(e) => handleBrandCheck(e, el)} />
                      <div className="checkDiv" ><img className='checkImg' src={checked} alt="" /></div>
                      <p>{el.name}</p>
                    </div>
                  )
                }
              })}

            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Kategoriyalar
            </Accordion.Header>
            <Accordion.Body className='accord'>
              {categories.map((el, i) => {
                return (
                  <div key={i + 100} className={`${el.name} category`}>
                    <input type="checkbox" checked={categoryParams.includes(el.name)} value={el.name} className='checkInput' id={i} onChange={(e) => handleCategoryCheck(e, el)} />
                    <div className="checkDiv" ><img className='checkImg' src={checked} alt="" /></div>
                    <p>{el.name}</p>
                  </div>
                )
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Qiymət</Accordion.Header>
            <Accordion.Body className='accord'>
              {priceCategories.map((el, i) => {
                return (
                  <div key={i + 100} className={`${el.name} category`}>
                    <input type="checkbox" checked={priceParams.includes(el.name)} value={el.name} className='checkInput' id={i} onChange={(e) => handlePriceCheck(e, el)} />
                    <div className="checkDiv" ><img className='checkImg' src={checked} alt="" /></div>
                    <p>{el.name}</p>
                  </div>
                )
              })}
            </Accordion.Body>
          </Accordion.Item>
          <div className="showFilteredItems" onClick={() => setShowFilterWindow(false)}>
            <p className='text-sm text-white text-center'> Filterlənmiş məhsulları göstər</p>
          </div>
        </Accordion>
        <div className="list">
          <div className="sort">
            <p className='totalCount'>{`${pagesCount?.total ? pagesCount?.total : 0} məhsul tapıldı`}</p>
            <BasicSelect priceSort={priceSort} setPriceSort={setPriceSort} handleSortSelect={handleSortSelect} />
          </div>
          {listLoading ? <div><GridLoader color='#2DD06E' className='innerGridLoader' /></div> : <><div className='listContents'>
            {products?.map((el, index) => {
              return <Link to={`/products/${el?.name}`} key={index} className="listContent" onClick={() => dispatch(setProduct(el?.id))}>
                <div className="imgDiv">
                  <img src={el?.image?.url} alt="" />
                </div>
                <h3>{el?.name}</h3>
                <p>{el?.price?.formatted_with_symbol}</p>
              </Link>
            })}
          </div>
          <PaginationRounded count={pagesCount} /></>}
        </div></>}
    </div>
  );
}

export default Products;