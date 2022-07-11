/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */

import SuppliersListModal from "@components/retailers/SuppliersListModal";

function ModalAddSuppliers({ suppliers, searchInput }) {
  return (
    <div className="pl-10 pr-10 pb-10">
      <table>
        <thead>
          <tr>
            <th
              scope="col"
              className="bg-middleBlue/70  text-l uppercase text-left pl-5"
            >
              Nom
            </th>
            <th scope="col" className="bg-middleBlue/70 text-l uppercase">
              Cathégorie
            </th>
            <th scope="col" className="bg-middleBlue/70" />
          </tr>
        </thead>
        <tbody>
          {suppliers
            .filter(
              (supplier) =>
                supplier.company_name.includes(searchInput) ||
                supplier.domain.includes(searchInput)
            )
            .map((supplier) => (
              <SuppliersListModal
                id={supplier.id}
                name={supplier.company_name}
                domaine={supplier.domain}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModalAddSuppliers;
