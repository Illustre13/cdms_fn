import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconX from "../../components/Icon/IconX";
import IconCode from "../../components/Icon/IconCode";

export const ApproveModal = ({
	openApprovalModal = false,
	approveModalCloseHandler = () => {},
}) => {
	return (
		<div>
			{openApprovalModal && (
				<div className="panel">
					<div className="mb-5">
						<Transition appear show={openApprovalModal} as={Fragment}>
							<Dialog
								as="div"
								open={openApprovalModal}
								onClose={() => approveModalCloseHandler()}
							>
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="fixed inset-0" />
								</Transition.Child>
								<div className="fixed inset-0 z-[999] bg-[black]/60 px-4">
									<div className="flex min-h-screen items-center justify-center px-4">
										<Dialog.Panel className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
											<div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
												<h5 className="text-lg font-bold">
													Approve Capacity Plan
												</h5>
												<button
													type="button"
													onClick={() => approveModalCloseHandler()}
													className="text-white-dark hover:text-dark"
												>
													<IconX />
												</button>
											</div>
											<div className="p-5">
												<p>
													Approve Capacity Plan for Rwanda Revenue Authority for
													the year 2024
												</p>
												<div className="mt-8 flex items-center justify-end">
													<button
														onClick={() => approveModalCloseHandler()}
														type="button"
														className="btn btn-outline-danger"
													>
														Cancel
													</button>
													<button
														type="button"
														onClick={() => approveModalCloseHandler()}
														className="btn btn-primary ltr:ml-4 rtl:mr-4"
													>
														Approve
													</button>
												</div>
											</div>
										</Dialog.Panel>
									</div>
								</div>
							</Dialog>
						</Transition>
					</div>
				</div>
			)}
		</div>
	);
};
