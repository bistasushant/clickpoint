import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PricingSection = () => {
  const plans = [
    {
      id: 1,
      title: 'Free Plan',
      price: 0,
      popular: false,
      features: [
        { text: 'Quam adipiscing vitae proin', available: true },
        { text: 'Nec feugiat nisl pretium', available: true },
        { text: 'Nulla at volutpat diam uteera', available: true },
        { text: 'Pharetra massa massa ultricies', available: false },
        { text: 'Massa ultricies mi quis hendrerit', available: false },
        { text: 'Voluptate id voluptas qui sed aperiam rerum', available: false },
        { text: 'Iure nihil dolores recusandae odit voluptatibus', available: false },
      ],
    },
    {
      id: 2,
      title: 'Business Plan',
      price: 29,
      popular: true,
      features: [
        { text: 'Quam adipiscing vitae proin', available: true },
        { text: 'Nec feugiat nisl pretium', available: true },
        { text: 'Nulla at volutpat diam uteera', available: true },
        { text: 'Pharetra massa massa ultricies', available: true },
        { text: 'Massa ultricies mi quis hendrerit', available: true },
        { text: 'Voluptate id voluptas qui sed aperiam rerum', available: true },
        { text: 'Iure nihil dolores recusandae odit voluptatibus', available: false },
      ],
    },
    {
      id: 3,
      title: 'Developer Plan',
      price: 49,
      popular: false,
      features: [
        { text: 'Quam adipiscing vitae proin', available: true },
        { text: 'Nec feugiat nisl pretium', available: true },
        { text: 'Nulla at volutpat diam uteera', available: true },
        { text: 'Pharetra massa massa ultricies', available: true },
        { text: 'Massa ultricies mi quis hendrerit', available: true },
        { text: 'Voluptate id voluptas qui sed aperiam rerum', available: true },
        { text: 'Iure nihil dolores recusandae odit voluptatibus', available: true },
      ],
    },
  ];

  return (
    <section className='py-16 bg-white'>
        <div className="container max-w-7xl mx-auto mb-12 px-4">
            <div className='flex items-center'>
                <h2 className='text-sm font-light text-gray-600 mr-4'>PRICING</h2>
                <div className='flex-glow-0 w-28 h-[1px] bg-green-500'/>
            </div>
            <span className='text-2xl font-semibold text-indigo-900'>CHECK OUR PRICING</span>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className='relative bg-green-50 rounded-xl p-8'
                    >
                        {plan.popular && (
                            <span className='absolute top-0 right-0 bg-blue-500 text-white text-xs font-medium px-4 py-1 rounded-bl-xl rounded-tr-xl'>
                                Popular
                            </span>
                        )}
                        <h3 className='text-2xl font-bold text-gray-800 mb-4'>{plan.title}</h3>
                        <p className='text-gray-600 mb-6'>
                            
                        </p>
                        <div className='mb-6'>
                            <span className='text-4xl font-bold text-gray-800'>
                                ${plan.price}
                            </span>
                            <span className='text-gray-600'> / month</span>
                        </div>
                        <button className='w-full py-3 mb-4 text-sm font-semibold rounded-lg transition-colors'>
                            Start a free trial
                        </button>
                        <p className='text-center text-gray-500 text-sm mb-6'>
                            No credit card required
                        </p>
                        <ul className='space-y-3'>
                            {plan.features.map((feature, idx) => (
                                <li
                                    key={idx}
                                    className={`flex items-center ${!feature.available ? 'text-gray-400' : 'text-gray-700'}`}
                                >
                                    {feature.available ? (
                                        <CheckIcon className='w-5 h-5 text-green-500 mr-2' />
                                    ) : (
                                        <XMarkIcon className='w-5 h-5 text-red-500 mr-2' />
                                    )}
                                    <span>{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>


    </section>
  );
};

export default PricingSection;