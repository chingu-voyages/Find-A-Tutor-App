import Button from './Button';

const TutorCard = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl py-2 rounded-none w-[75%] lg:w-1/2">
      <figure className="flex flex-col gap-4 pl-6 mt-[2rem]">
        <img
          className="w-24 h-24 rounded-full"
          src="https://placeimg.com/200/280/arch"
          alt="Movie"
        />
        <Button text={`View`} />
      </figure>
      <div className="card-body">
        <div className="mb-4">
          <h2 className="card-title">Jane Doe</h2>
          <p className="text-[#A7A6AC] font-semibold">Software Dev</p>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. corporis,
          ad, ex beatae maiores tempora soluta nihil aperiam qui quam debitis.
          Numquam reprehenderit in facere dolorum laudantium? Exercitationem,
          autem voluptatem. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. corporis, ad, ex beatae maiores tempora soluta nihil aperiam qui
          quam debitis. Numquam reprehenderit in facere dolorum laudantium?
          Exercitationem, autem voluptatem. Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. corporis, ad, ex beatae maiores tempora
          soluta nihil aperiam qui quam debitis. Numquam reprehenderit in facere
          dolorum laudantium? Exercitationem, autem voluptatem. Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. corporis, ad, ex beatae
          maiores tempora soluta nihil aperiam qui quam debitis. Numquam
          reprehenderit in facere dolorum laudantium? Exercitationem, autem
          voluptatem.
        </p>
      </div>
    </div>
  );
};

export default TutorCard;
